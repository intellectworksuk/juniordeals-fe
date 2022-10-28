import * as QuizService from "../../../store/quiz/quiz.actions";
import { Button, Form, Input, Radio, Space, Spin } from "antd";
import { useEffect } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CreateQuizData,
  QuizQuestionResponse,
  QuizResponse,
} from "../../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import { SingleUpload } from "../../Components/SingleFileUpload";
import {
  clearQuizError,
  clearQuizStatus,
} from "../../../store/quiz/quiz.slice";
import { useLocation } from "react-router-dom";

const { Item } = Form;

export const EditQuizPage = () => {
  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const quiz = location.state as QuizResponse;

  const {
    status: quizStatus,
    error: quizError,
    quizCategories,
  } = useAppSelector((state) => state.quiz);

  useEffectOnce(() => {
    dispatch(QuizService.fetchQuizCategories());
  });

  const onFormSubmit = (formData: CreateQuizData) => {
    if (location.pathname.endsWith("/quiz/add")) {
      dispatch(QuizService.createQuiz(formData));
    } else {
      formData.id = quiz.id;

      dispatch(QuizService.createQuiz(formData));
    }
  };

  const onFinishFailed = () => {
    displayErrorMessage(
      "Please complete all required form fields, or remove errors!"
    );
    return;
  };

  const imageSelectCallback = (file: any) => {
    if (file) form.setFieldsValue({ image: file.response.result });
  };

  useEffect(() => {
    if (quizError) {
      displayErrorMessage(quizError);
      dispatch(clearQuizError());
    }
  }, [dispatch, quizError]);

  useEffect(() => {
    if (quizStatus === "createQuizResolved") {
      displaySuccessNotification("Quiz has been saved successfully");

      form.resetFields();

      dispatch(clearQuizStatus());
    }
  }, [dispatch, quizStatus]);

  useEffect(() => {
    if (quiz && quiz.title) {
      form.setFieldsValue({ QuizCategoryId: "0" });
      form.setFieldsValue({ Title: quiz.title });
      form.setFieldsValue({ Description: quiz.description });

      quiz.quizQuestion.forEach((ques, index) => {
        if (index === 0) {
          form.setFieldsValue({ InputQuizQuestion0: ques.question });
          form.setFieldsValue({
            InputQuizQuestion0Choice1: ques.choices?.split("|")[0],
          });
          form.setFieldsValue({
            InputQuizQuestion0Choice2: ques.choices?.split("|")[1],
          });
          form.setFieldsValue({
            InputQuizQuestion0Choice3: ques.choices?.split("|")[2],
          });
          form.setFieldsValue({ InputQuizQuestion0Answer0: ques.answer });
        }
      });
    }
  }, [quiz]);

  return (
    <>
      <Form
        form={form}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-lg-12 col-lg-offset-5">
            <Item name="image" hidden={true}>
              <input />
            </Item>
            <SingleUpload type="quiz" onImageSelect={imageSelectCallback} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="QuizCategoryId"
              rules={[
                {
                  required: true,
                  message: "Please enter what defines the category of the quiz",
                },
              ]}
            >
              <select className="inpCtrl">
                <option value="0">Category</option>

                {quizCategories.map((cat) => (
                  <option value={cat.id.toString()} key={cat.id.toString()}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter what defines the title of the quiz",
                },
              ]}
            >
              <input
                maxLength={30}
                className="inpCtrl"
                placeholder="Title of the quiz"
              />
            </Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="Description"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the description of the quiz",
                },
              ]}
            >
              <input
                maxLength={100}
                className="inpCtrl"
                placeholder="Description of the quiz"
              />
            </Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            {quiz.quizQuestion.map((ques, index) => (
              <Space
                key={index}
                style={{ width: "100%", marginBottom: 8 }}
                align="baseline"
              >
                <b>Question #{index.toString()}</b>

                <Space direction="vertical">
                  <Form.Item
                    name={`InputQuizQuestion${index}`}
                    rules={[{ required: true, message: "Enter question" }]}
                  >
                    <input
                      style={{ width: "600px" }}
                      maxLength={100}
                      className="inpCtrl"
                      placeholder="Question text"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Choice #1"
                    name={`InputQuizQuestion${index}Choice1`}
                    rules={[{ required: true, message: "Enter choice" }]}
                  >
                    <input
                      maxLength={100}
                      className="inpCtrl"
                      placeholder="Choice text"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Choice #2"
                    name={`InputQuizQuestion${index}Choice2`}
                    rules={[{ required: true, message: "Enter choice" }]}
                  >
                    <input
                      maxLength={100}
                      className="inpCtrl"
                      placeholder="Choice text"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Choice #3"
                    name={`InputQuizQuestion${index}Choice3`}
                    rules={[{ required: true, message: "Enter choice" }]}
                  >
                    <input
                      maxLength={100}
                      className="inpCtrl"
                      placeholder="Choice text"
                    />
                  </Form.Item>

                  <Form.Item
                    name={`InputQuizQuestion${index}Answer${index}`}
                    rules={[{ required: true, message: "Enter answer" }]}
                  >
                    <input
                      style={{ width: "600px" }}
                      maxLength={100}
                      className="inpCtrl"
                      placeholder="Answer text"
                    />
                  </Form.Item>
                </Space>
                {/* <QuestionControl id={key} name={name} /> */}
                {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
              </Space>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <button
              className="formBtnCtrl"
              type="submit"
              disabled={quizStatus === "createQuizPending"}
            >
              <span id="button-text">
                {quizStatus === "createQuizPending" ? (
                  <Spin size="small" />
                ) : (
                  "Update Quiz"
                )}
              </span>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};
