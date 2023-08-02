import {
  Button,
  Container,
  render,
  VerticalSpace,
  Textbox,
  Text
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useCallback, useState } from "preact/hooks";

import { CloseHandler, CreatePopulateDataHandler } from "./types";

function Plugin() {
  const [value, setValue] = useState<string>("");
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setValue(newValue);
  };
  
  function handleCreatePopulateDataButtonClick() {
    emit("CREATE_POPULATE_DATA", value);
  }

  return (
    <Container space="large">
      <VerticalSpace space="large" />
      <Text>Enter search term</Text>
      <VerticalSpace space="small" />
      <Textbox onChange={handleChange} value={value} variant="border" />
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleCreatePopulateDataButtonClick}>
        Populate
      </Button>
      <VerticalSpace space="extraSmall" />
      <Button fullWidth onClick={handleCloseButtonClick} secondary>
        Close
      </Button>
      <VerticalSpace space="extraSmall" />
    </Container>
  );
}

export default render(Plugin);
   