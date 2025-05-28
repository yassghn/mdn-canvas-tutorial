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

function _startAudio(audioSrc, audioData) {
    audioSrc.buffer = audioData
    audioSrc.start(0)
    audioSrc.loop = true
    _audioState.isPlaying = true
}

function _audioDataDecodeError(error) {
    if (config.debug) {
        console.error(error)
    }
}

async function _decodeAudioData(audioData) {
    // audio audio context and source
    const audioCtx = _hewAudioContext()
    const audioSrc = _hewAudioSource(audioCtx)
    // decode audio data
    try {
        await audioCtx.decodeAudioData(
            // array buffer
            audioData,
            // success callback
            (audioData) => {
                _startAudio(audioSrc, audioData)
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

function _requestAudioData() {
    const request = new XMLHttpRequest()
    request.open('GET', playlistJson.audio.current, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
        //_decodeAudioData(request.response)
        const _audioData = request.response
        var player = new PCMPlayer({
            inputCodec: 'Int16',
            channels: 2,
            sampleRate: 44100,
            flushTime: 2000
        })
        player.feed(_audioData)
        player.continue()
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
