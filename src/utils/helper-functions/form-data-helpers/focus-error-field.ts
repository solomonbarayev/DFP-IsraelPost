const focusErrorField = (fieldName: string) => {
  const inputElement = document.querySelector(`[name="${fieldName}"]`);
  if (inputElement) {
    inputElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    //   passive: true,
    });
    (inputElement as HTMLElement).focus();
  }
};

export default focusErrorField;