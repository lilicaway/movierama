export function whenScrollIsNearTheBottom(config: {
  callback: () => void;
  triggerOffsetPx?: number;
}) {
  const triggerOffsetPx =
    config.triggerOffsetPx != null ? config.triggerOffsetPx : 800;
  document.addEventListener('scroll', () => {
    const distToBottom = getDistFromBottom();

    if (distToBottom <= triggerOffsetPx) {
      config.callback();
    }
  });
}

function getDistFromBottom() {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
  const scrollPosition = window.pageYOffset;
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
  const windowSize = window.innerHeight;
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
  const bodyHeight = document.body.offsetHeight;

  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

export function isThereStillRoomAtBottomOfVisibileArea(): boolean {
  const windowSize = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  return bodyHeight < windowSize;
}
