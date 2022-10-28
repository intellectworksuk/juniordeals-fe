import Apiconfig from "../../../config/Apiconfig";
import { QuizResponse } from "../../../types";
import * as routes from "../../../constants/routes";
import { Image, Modal, Radio, RadioChangeEvent, Space } from "antd";
import noImageIcon from "../../assets/img/jd-icon.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const PlayQuizPage = () => {
  const location = useLocation();

  const { questionair } = location.state as any | {};

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);

  const [selectedChoice, setSelectedChoice] = useState<string>("");

  const [correctAnswer, setCorrectAnswer] = useState<string>("none");
  const [incorrectAnswer, setInCorrectAnswer] = useState<string>("none");

  const [radioDisable, setRadioDisable] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);

  const onChange = (e: RadioChangeEvent) => {
    setRadioDisable(true);
    setSelectedChoice(e.target.value);
  };

  useEffect(() => {
    if (selectedChoice === "") {
      setCorrectAnswer("none");
      setInCorrectAnswer("none");
    } else if (questionair.quizQuestion[quizIndex].answer === selectedChoice) {
      setCorrectAnswerCount(correctAnswerCount + 1);
      setCorrectAnswer("block");
      setInCorrectAnswer("none");
    } else {
      setCorrectAnswer("none");
      setInCorrectAnswer("block");
    }
  }, [selectedChoice]);

  const showResultModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const retakeQuiz = () => {
    setModalVisible(false);
    setSelectedChoice("");
    setQuizIndex(0);
    setCorrectAnswerCount(0);
    setRadioDisable(false);
  };

  return (
    <>
      <section className="sec-msg-system">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
              <div className="quizboard">
                <div className="boardHeader">
                  <h4 className="qMiniHeader">Play Quiz</h4>
                  <h2>{questionair.title}</h2>
                  <h5>{questionair.description}</h5>
                </div>
                <div className="boardBody">
                  <div
                    className="answer correct"
                    style={{ display: `${correctAnswer}` }}
                  >
                    <div className="anshead">
                      <div className="questionCounter">
                        -- Question {quizIndex + 1} of{" "}
                        {questionair.quizQuestion.length} --
                      </div>
                      <div className="result">
                        <h2>
                          <span className="glyphicon glyphicon-ok"></span>
                          &ensp;Correct
                        </h2>
                        {quizIndex + 1 < questionair.quizQuestion.length ? (
                          <button
                            type="button"
                            className="nxtQuest"
                            onClick={() => {
                              setRadioDisable(false);
                              setSelectedChoice("");
                              setQuizIndex(quizIndex + 1);
                            }}
                          >
                            Next Question
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="nxtQuest"
                            onClick={showResultModal}
                          >
                            Finish
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="ansBody">
                      <h4></h4>
                    </div>
                  </div>
                  <div
                    className="answer incorrect"
                    style={{ display: `${incorrectAnswer}` }}
                  >
                    <div className="anshead">
                      <div className="questionCounter">
                        -- Question {quizIndex + 1} of{" "}
                        {questionair.quizQuestion.length} --
                      </div>
                      <div className="result">
                        <h2>
                          <span className="glyphicon glyphicon-remove"></span>
                          &ensp;Incorrect
                        </h2>
                        {quizIndex + 1 < questionair.quizQuestion.length ? (
                          <button
                            type="button"
                            className="nxtQuest"
                            onClick={() => {
                              setRadioDisable(false);
                              setSelectedChoice("");
                              setQuizIndex(quizIndex + 1);
                            }}
                          >
                            Next Question
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="nxtQuest"
                            onClick={showResultModal}
                          >
                            Finish
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="ansBody">
                      <h4>
                        Correct Answer:{" "}
                        {questionair.quizQuestion[quizIndex].answer}
                      </h4>
                    </div>
                  </div>
                  <div className="question">
                    <h2>{questionair.quizQuestion[quizIndex].question}</h2>
                    {questionair.image && questionair.image.length > 0 ? (
                      <img
                        src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${questionair.image}&type=quiz`}
                        alt=""
                      />
                    ) : (
                      <Image preview={false} src={noImageIcon} />
                    )}
                    <div className="selectionArea">
                      <Radio.Group
                        onChange={onChange}
                        value={selectedChoice}
                        disabled={radioDisable}
                      >
                        <Space direction="vertical">
                          {questionair.quizQuestion[quizIndex].choices
                            ?.split("|")
                            .map((choice: string, index: number) => (
                              <Radio key={index} value={choice}>
                                {choice}
                              </Radio>
                            ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        centered
        title="Quiz Result"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="result text-center">
          <h1 style={{ color: "#5cb85c" }}>
            <b>Result</b>
          </h1>
          <h2>{`${correctAnswerCount} / ${questionair.quizQuestion.length}`}</h2>
          <h3>
            {(correctAnswerCount / questionair.quizQuestion.length) * 100} %
          </h3>
          <br />
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <button className="btn-round-sec btn-block" onClick={retakeQuiz}>
                Retake
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
