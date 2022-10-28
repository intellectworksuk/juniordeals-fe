import { createSlice } from "@reduxjs/toolkit";
import { QuizState } from "../../types";
import * as QuizService from "./quiz.actions";
import * as Util from "../../util/helper";

export const initialState: QuizState = Object.freeze({
  status: "idle",
  error: "",
  quizCategories: [],
  quizes: [],
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearQuizError: (state) => {
      state.error = "";
    },
    clearQuizStatus: (state) => {
      state.status = "idle";
    },
    clearQuizes: (state) => {
      state.quizCategories = [];
      state.quizes = [];
    }
  },

  extraReducers: (builder) => {
    builder.addCase(QuizService.fetchQuizCategories.pending, (state) => {
      state.status = "fetchQuizCategoriesPending";
      state.error = "";
    });
    builder.addCase(
      QuizService.fetchQuizCategories.fulfilled,
      (state, { payload }) => {
        state.status = "fetchQuizCategoriesResolved";

        state.quizCategories = Util.fill(payload);
        state.quizes = state.quizCategories.flatMap((c) => c.quiz);

        state.error = "";
      }
    );
    
    builder.addCase(QuizService.fetchUserQuizes.pending, (state) => {
      state.status = "fetchUserQuizesPending";
      state.error = "";
    });
    builder.addCase(
      QuizService.fetchUserQuizes.fulfilled,
      (state, { payload }) => {
        state.status = "fetchUserQuizesResolved";

        state.quizCategories = Util.fill(payload);
        state.quizes = state.quizCategories.flatMap((c) => c.quiz);

        state.error = "";
      }
    );

    builder.addCase(QuizService.fetchAllQuizes.pending, (state) => {
      state.status = "fetchAllQuizesPending";
      state.error = "";
    });
    builder.addCase(
      QuizService.fetchAllQuizes.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllQuizesResolved";

        state.quizCategories = Util.fill(payload);
        state.quizes = state.quizCategories.flatMap((c) => c.quiz);

        state.error = "";
      }
    );

    builder.addCase(QuizService.createQuiz.pending, (state) => {
      state.status = "createQuizPending";
      state.error = "";
    });
    builder.addCase(QuizService.createQuiz.fulfilled, (state) => {
      state.status = "createQuizResolved";
      state.error = "";
    });
    builder.addCase(
      QuizService.createQuiz.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "createQuizRejected";
      }
    );

    builder.addCase(QuizService.approveQuiz.pending, (state) => {
      state.status = "approveQuizPending";
      state.error = "";
    });
    builder.addCase(QuizService.approveQuiz.fulfilled, (state) => {
      state.status = "approveQuizResolved";
      state.error = "";
    });
    builder.addCase(
      QuizService.approveQuiz.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "approveQuizRejected";
      }
    );
  },
});

// actions from slice
export const { clearQuizError, clearQuizStatus, clearQuizes } = quizSlice.actions;

// The reducer
export default quizSlice.reducer;
