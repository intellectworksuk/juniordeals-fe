import Apiconfig from "../../config/Apiconfig";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useEffectOnce from "../../hooks/useEffectOnce";
import * as QuizService from "../../store/quiz/quiz.actions";
import * as routes from "../../constants/routes";
import { Divider, Image, Skeleton, Space } from "antd";
import noImageIcon from "../assets/img/jd-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UserType } from "../../enums";
import { useEffect, useState } from "react";
import { clearQuizes } from "../../store/quiz/quiz.slice";
import { displayErrorMessage, displaySuccessNotification } from "../../util/notifications";

export const QuizListing = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const { status: adminStatus, error: adminError } = useAppSelector(
    (state) => state.admin
  );

  const { quizes, status: quizStatus, error: quizError } = useAppSelector((state) => state.quiz);

  const [showCreateEditButton, setShowCreateEditButton] =
    useState<boolean>(true);

  useEffect(() => {
    dispatch(clearQuizes());

    if (
      [UserType.ADMIN, UserType.SUPER_ADMIN].includes(Number(user.userType))
    ) {
      dispatch(QuizService.fetchAllQuizes(0));
      setShowCreateEditButton(false);
    } else if (location.pathname === routes.FETCH_USER_QUIZ) {
      dispatch(QuizService.fetchUserQuizes());
      setShowCreateEditButton(false);
    } else {
      dispatch(QuizService.fetchQuizCategories());
      setShowCreateEditButton(true);
    }
  }, [location, user]);

  useEffect(() => {
    if (quizError) {
      displayErrorMessage(quizError);
    }
  }, [quizError])

  useEffect(() => {
    if (quizStatus === "approveQuizResolved") {
      displaySuccessNotification("Quiz has been approved.");
      dispatch(QuizService.fetchAllQuizes(0));
    }
  }, [quizStatus])

  return (
    <>
      {quizStatus.endsWith("Pending") ? (
        <Skeleton active />
      ) : (
        <div className="sec-itemized-quiz">
          <div className="freeHeadCenter">
            <h3>
              Latest Quizes
              <br />
            </h3>
          </div>
          <div className="itemized-quiz">
            {quizes.map((quiz) => (
              <div key={Math.random()} className="quiz-item">
                <div className="imgBox">
                  {quiz.image && quiz.image.length > 0 ? (
                    <img
                      style={{ maxWidth: "100%", height: "160px" }}
                      src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${quiz.image}&type=quiz`}
                      alt=""
                    />
                  ) : (
                    <Image preview={false} src={noImageIcon} />
                  )}
                </div>
                <div className="miniDetail">
                  <strong>{quiz.title}</strong>
                </div>
                <div className="softactions">
                  <button
                    hidden={
                      [UserType.PARENT, UserType.CHILD].includes(
                        Number(user.userType)
                      ) || quiz.isActive
                    }
                    className="softactionbtn"
                    onClick={() => dispatch(QuizService.approveQuiz(quiz.id))}
                  >
                    Approve
                  </button>
                  <button
                    hidden={showCreateEditButton}
                    className="softactionbtn"
                    onClick={() =>
                      navigate(routes.EDIT_QUIZ, {
                        state: quiz,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    hidden={!showCreateEditButton}
                    className="softactionbtn"
                    onClick={() =>
                      navigate(routes.PLAY_QUIZ, {
                        state: { questionair: quiz },
                      })
                    }
                  >
                    Play Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <Divider />
            <div className="text-center">
              <Space>
                <button
                  hidden={showCreateEditButton}
                  className="btn-round-sec btn-block"
                  type="button"
                  onClick={() => navigate(routes.QUIZ_SETUP)}
                >
                  Create Quiz
                </button>
              </Space>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
