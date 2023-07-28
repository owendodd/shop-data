import {
  Button,
  Dropdown,
  DropdownOption,
  Container,
  render,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useCallback, useState } from "preact/hooks";

import { CloseHandler, CreatePopulateDataHandler } from "./types";

function Plugin() {
  const [value, setValue] = useState<null | string>(null);
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);
  // const options: Array<DropdownOption> = [{
  //   value: 'Ceremonia'
  // }, {
  //   value: 'Outdoor Voices'
  // }, {
  //   value: 'Mansur Gavriel'
  // }];

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setValue(newValue);
  };
  
  function handleCreatePopulateDataButtonClick() {
    emit("CREATE_POPULATE_DATA");
  }

  return (
    <Container space="large">
      <VerticalSpace space="large" />
      {/* <Dropdown onChange={handleChange} options={options} value={value} variant="border" /> */}
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
