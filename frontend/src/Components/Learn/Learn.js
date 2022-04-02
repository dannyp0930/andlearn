import React, { useEffect, useState, useCallback } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
import { GrammarlyEditor } from './GrammarlyEditor'
import plusDefault from './plusDefault.png'
import { apiInstance } from 'api/index'
import styled from "styled-components";

export function Learn() {
  const api = apiInstance()
  const [fileImage, setFileImage] = useState(plusDefault)
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)
  const [keyDjango, setKeyDjango] = useState('')

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')

  function next() {
    setStage(stage + 1)
    console.log(stage)
  }
  function onCheck(e) {
    console.log(e.target.value)
    setScript1(e.target.value)
  }
  function onSubmit() {
    const formData = new FormData()
    formData.append('file', aud1)

    api
      .post(`learn/${keyDjango}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        next()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
      <div>
        <img src={fileImage} width={300} height={280} alt="추가한 사진" />
        {stage === 0 && (
          <ImageUpload
            setFileImage={setFileImage}
            setImageId={setImageId}
            next={next}
            setKeyDjango={setKeyDjango}
          />
        )}
      </div>
      <div>
        {stage >= 1 && (
          <>
            <AudioRecord
              setScript={setScript1}
              next={next}
              setAudioUrl1={setAudioUrl1}
              setAud1={setAud1}
            />
            {aud1 && (
              <>
                <textarea value={script1} onChange={onCheck}>
                  {script1}
                </textarea>
                <audio controls src={aud1} controlsList="nodownload"></audio>
              </>
            )}
          </>
        )}
      </div>
      <div>
        {stage >= 2 && (
          <>
            <GrammarlyEditor script={script1} stage={stage} next={next} />
          </>
        )}
      </div>
      <div>
        {stage >= 3 && (
          <>
            <AudioRecord
              setScript={setScript2}
              next={next}
              setAudioUrl1={setAudioUrl2}
              setAud1={setAud2}
            />
            {aud2 && (
              <audio controls src={aud2} controlsList="nodownload"></audio>
            )}
          </>
        )}
      </div>
      <div>{stage >= 4 && <div>다음</div>}</div>
    </div>
  )
}
