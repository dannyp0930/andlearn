import React, { useEffect, useState, useCallback } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
import { GrammarlyEditor } from './GrammarlyEditor'
import plusDefault from './plusDefault.png'
import { apiInstance } from 'api/index'
import { MyButton } from 'styles/Button.js'
import styled from "styled-components";

export function Learn() {
  const api = apiInstance()
  const [fileImage, setFileImage] = useState(plusDefault)
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)
  const [keyDjango, setKeyDjango] = useState(2)
  const [words, setWords] = useState([])

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')
  const recommendWord = words.map((word) => <p key={word.id}>{word}</p>)
  function next() {
    setStage(stage + 1)
  }
  function onCheck(e) {
    console.log(e.target.value)
    setScript1(e.target.value)
  }
  function onSubmit() {
    console.log(audioUrl1)
    const sound1 = new File([audioUrl1], "soundBlob", { lastModified: new Date().getTime(), type: "audio/m4a" });
    console.log(URL.createObjectURL(sound1))

    const formData = new FormData()
    formData.append('file', aud1)

    // formData.append('file2', aud2)
    console.log(aud1)
    console.log(aud2)
    const data = {
      score: 5.0,
      words: words,
      sentences: [script1, script2],
    }
    // formData.append(
    //   'learnPostReq',
    //   // new Blob([JSON.stringify(data)], { type: 'application/json' })
    //   JSON.stringify(data)
    // )

    api
      .post(`learn/test/${keyDjango}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
            next={next}
            setKeyDjango={setKeyDjango}
            setWords={setWords}
          />
        )}
      </div>
      <div>{recommendWord}</div>
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
                <audio controls src={audioUrl1} controlsList='download'></audio>
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
              <audio controls src={audioUrl2} controlsList="nodownload"></audio>
            )}
          </>
        )}
      </div>
      <div>{stage >= 4 && <MyButton onClick={onSubmit}>다음</MyButton>}</div>
      <div>
        {stage >= 5 && <MyButton onClick={onSubmit}>전송완료</MyButton>}
      </div>
    </div>
  )
}
