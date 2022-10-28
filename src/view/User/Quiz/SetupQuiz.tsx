import * as QuizService from "../../../store/quiz/quiz.actions";
import { Button, Form, Input, Radio, Space, Spin } from "antd";
import { useEffect } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CreateQuizData } from "../../../types";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import { SingleUpload } from "../../Components/SingleFileUpload";
import {
  clearQuizError,
  clearQuizStatus,
} from "../../../store/quiz/quiz.slice";
import { QuizCategoryResponse } from "../../../types";

const { Item } = Form;

export const SetupQuizPage = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const {
    status: quizStatus,
    error: quizError,
    quizCategories,
  } = useAppSelector((state) => state.quiz);

  useEffectOnce(() => {
    dispatch(QuizService.fetchQuizCategories());
  });

  const onFormSubmit = (formData: CreateQuizData) => {
    dispatch(QuizService.createQuiz(formData));
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

  return (
    <>
      <Form
        form={form}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-lg-8 col-lg-offset-5">
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

                {quizCategories.map((cat: QuizCategoryResponse) => (
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
            <Form.List name="InputQuizQuestions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ width: "100%", marginBottom: 8 }}
                      align="baseline"
                    >
                      <b>Question #{key.toString()}</b>

                      <Space direction="vertical">
                        <Form.Item
                          {...restField}
                          name={[name, `Question${key}`]}
                          rules={[
                            { required: true, message: "Enter question" },
                          ]}
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
                          {...restField}
                          name={[name, `Question${key}Choice1`]}
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
                          {...restField}
                          name={[name, `Question${key}Choice2`]}
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
                          {...restField}
                          name={[name, `Question${key}Choice3`]}
                          rules={[{ required: true, message: "Enter choice" }]}
                        >
                          <input
                            maxLength={100}
                            className="inpCtrl"
                            placeholder="Choice text"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, `Question${key}Answer${key}`]}
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
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add question
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
                  "Create Quiz"
                )}
              </span>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};
