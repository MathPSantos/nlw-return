import { SubmitFeedbackUseCase } from "./submit-feedback.use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit feedback", () => {
  it("should be able to submite a feedback", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    );

    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,screenshot.png",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without a type", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedback.execute({
        type: "",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,screenshot.png",
      })
    ).rejects.toThrowError("Type is required");
  });

  it("should not be able to submit a feedback without a comment", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,screenshot.png",
      })
    ).rejects.toThrowError("Comment is required");
  });

  it("should not be able to submit a feedback without a invalid screenchot", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "123",
      })
    ).rejects.toThrowError("Invalid screenshot");
  });
});
