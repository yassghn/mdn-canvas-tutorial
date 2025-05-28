/**
 * audio.mjs
 */

import { config } from './config.mjs'
import playlistJson from '../../resource/data/audio.json' with { type: 'json' }

const _audioState = {
    isPlaying: false
}

function _hewAudioContext() {
    const ctx = new AudioContext({ muted: true })
    return ctx
}

function _hewAudioSource(audioCtx) {
    const audioSrc = audioCtx.createBufferSource()
    audioSrc.connect(audioCtx.destination)
    return audioSrc
}

function _hewAudioGain(audioCtx, audioSrc) {
    const audioGain = audioCtx.createGain()
    audioGain.connect(audioCtx.destination)
    audioSrc.connect(audioGain)
}

function _startAudio(audioData) {
    // hew audio context and source
    const audioCtx = _hewAudioContext()
    const audioSrc = _hewAudioSource(audioCtx)
    const audioGain = _hewAudioGain(audioCtx, audioSrc)
    // set volume
    audioGain.gain.value = 7
    // begin playback
    audioSrc.buffer = audioData
    audioSrc.start(0)
    audioSrc.loop = true
    // set audio state
    _audioState.isPlaying = true
}

function _audioDataDecodeError(error) {
    if (config.debug) {
        console.error(error)
    }
}

async function _decodeAudioData(audioData) {
    // decode audio data
    try {
        await audioCtx.decodeAudioData(
            // array buffer
            audioData,
            // success callback
            (audioData) => {
                _startAudio(audioData)
            },
            // error callback
            (error) => {
                _audioDataDecodeError(error)
            }
        )
    } catch (e) {
        if (config.debug) {
            console.log('audio decode error: check file, file name, missing file, etc.')
        }
    }
}

/**
 * bypass neocities file restrictions for free user accounts.
 *
 * convert audio file (opus, etc...) to raw pcm
 * $ ffmpeg -i 'audioFile.ext' -f s16le -acodec pcm_s16le -ar 44100 'outFile.raw'
 *
 * rename converted file extension to *.json and upload to neocities
 *
 * play with pcm-player (imported via html <script> tag)
 *
 * @param {ArrayBuffer} audioData
 */
function _hackNeocities(audioData) {
    try {
        // init player
        const player = new PCMPlayer({
            inputCodec: 'Int16',
            channels: 2,
            sampleRate: 44100,
            flushTime: 0,
            // loop audio
            onended: (audioSrc, event) => {
                _startAudio(audioSrc.buffer)
            }
        })
        // set volume
        player.volume(7)
        // begin playback
        player.feed(audioData)
        // set audio state
        _audioState.isPlaying = true
    } catch (e) {
        if (config.debug) {
            console.error(e)
        }
    }
}

function _isNeocitiesDomain() {
    const retVal = { isNeocitiesDomain: false }
    const href = window.location.href
    if (href.includes('neocities.org')) {
        retVal.isNeocitiesDomain = true
    }
    return retVal.isNeocitiesDomain
}

function _requestAudioData() {
    const request = new XMLHttpRequest()
    request.open('GET', playlistJson.audio.current, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
        // get audio data from response
        const audioData = request.response
        // check if we're doing neocities hack
        if (_isNeocitiesDomain()) {
            _hackNeocities(audioData)
        } else {
            _decodeAudioData(audioData)
        }
    }
    request.send()
}

function _validateRequestAudio() {
    // check if we're already playing audio
    if (!_audioState.isPlaying) {
        try {
            // init audio
            _requestAudioData()
        } catch (e) {
            console.error(e)
        }
    }
}

function _processClick(event) {
    event.preventDefault()
    // check for mouse click
    if (event.buttons != undefined) {
        _validateRequestAudio()
    }
}

function _addDocumentClickListener() {
    document.addEventListener('click', _processClick)
}

function _playAudio() {
    _addDocumentClickListener()
}

const audio = {
    playAudio: () => {
        _playAudio()
    }
}

export default audio
