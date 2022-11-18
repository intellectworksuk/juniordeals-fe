import { createAsyncThunk } from "@reduxjs/toolkit";
import Apiconfig from "../../config/Apiconfig";
import {
  CreateQuizData,
  QuizCategoryResponse,
  QuizQuestionResponse,
  QuizResponse,
} from "../../types";
import http from "../../util/http";

export const fetchQuizCategories = createAsyncThunk(
  "quiz/fetchQuizCategories",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.quiz.fetchQuizCategories;

      const {
        data: { result },
      } = await http.get<{ result: QuizCategoryResponse[] }>(url);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.quiz.createQuiz;

      let quiz: CreateQuizData = {};

      // quiz = JSON.parse(JSON.stringify(values))
      quiz.QuizCategoryId = values.QuizCategoryId;
      quiz.Image = values.image;
      quiz.Title = values.Title;
      quiz.Description = values.Description;

      quiz.QuizQuestions = [];

      values.InputQuizQuestions.forEach((ques: any, index: number) => {
        let newquestion: QuizQuestionResponse = {};

        newquestion.question = ques[`Question${index}`];

        newquestion.choices = ques[`Question${index}Choice1`] + "|";
        newquestion.choices += ques[`Question${index}Choice2`] + "|";
        newquestion.choices += ques[`Question${index}Choice3`];

        newquestion.type = "TextField";

        newquestion.answer = ques[`Question${index}Answer${index}`];

        quiz.QuizQuestions && quiz.QuizQuestions.push(newquestion);
      });

      const {
        data: { result },
      } = await http.post<{ result: QuizResponse }>(url, quiz);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateQuiz = createAsyncThunk(
  "quiz/updateQuiz",
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.quiz.updateQuiz}/${values.id}`;

      let quiz: CreateQuizData = {};

      // quiz = JSON.parse(JSON.stringify(values))
      quiz.QuizCategoryId = values.QuizCategoryId;
      quiz.Image = values.image;
      quiz.Title = values.Title;
      quiz.Description = values.Description;

      quiz.QuizQuestions = [];

      values.InputQuizQuestions.forEach((ques: any, index: number) => {
        let newquestion: QuizQuestionResponse = {};

        newquestion.question = ques[`Question${index}`];

        newquestion.choices = ques[`Question${index}Choice1`] + "|";
        newquestion.choices += ques[`Question${index}Choice2`] + "|";
        newquestion.choices += ques[`Question${index}Choice3`];

        newquestion.type = "TextField";

        newquestion.answer = ques[`Question${index}Answer${index}`];

        quiz.QuizQuestions && quiz.QuizQuestions.push(newquestion);
      });

      const {
        data: { result },
      } = await http.put<{ result: QuizResponse }>(url, quiz);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchAllQuizes = createAsyncThunk(
  "quiz/fetchAllQuizes",
  async (id: number, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.quiz.fetchAllQuizes}?isActive=true`;

      const {
        data: { result },
      } = await http.get<{ result: QuizResponse[] }>(url);

      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchUserQuizes = createAsyncThunk(
  "quiz/fetchUserQuizes",
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.quiz.fetchUserQuizes;

      const {
        data: { result },
      } = await http.get<{ result: QuizCategoryResponse[] }>(url);

      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const approveQuiz = createAsyncThunk(
  "quiz/approveQuiz",
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.quiz.approveQuiz}/${id}/updatestatus/true`;

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
