import VideoModal from "./video-modal";

describe("video-modal", () => {
  beforeEach(() => {
    document.body.innerHTML = `
<div data-video-modal>
    <button data-modal-open>Open video</button>
    <div data-modal-window class="video-modal" aria-live="polite">
        <button data-modal-close class="video-modal__close">Close</button>
        <div class="video-modal__container">
            <iframe src="https://www.youtube-nocookie.com/embed/83w3Epl4YcM"></iframe>
        </div>
    </div>
</div>`;
  });

  it("initialises successfully", () => {
    expect(() => {
      new VideoModal(document.querySelector(VideoModal.selector()));
    }).not.toThrowError();
  });
});
