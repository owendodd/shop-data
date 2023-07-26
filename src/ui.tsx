import {
  Button,
  Dropdown,
  DropdownOption,
  Container,
  render,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import { CloseHandler, CreateRectanglesHandler } from "./types";

function Plugin() {
  const [count, setCount] = useState<number | null>(5);
  const [countString, setCountString] = useState("5");
  const [value, setValue] = useState<null | string>(null);
  const handleCreateRectanglesButtonClick = useCallback(
    function () {
      if (count !== null) {
        emit<CreateRectanglesHandler>("CREATE_RECTANGLES", count);
      }
    },
    [count]
  );
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);
  const options: Array<DropdownOption> = [{
    value: 'Ceremonia'
  }, {
    value: 'Outdoor Voices'
  }, {
    value: 'Mansur Gavriel'
  }];
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  };
  
  return (
    <Container space="large">
      <VerticalSpace space="large" />
      <Dropdown onChange={handleChange} options={options} value={value} variant="border" />
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
        Populate
      </Button>
      <VerticalSpace space="extraSmall" />
      <Button fullWidth onClick={handleCloseButtonClick}>
        Close
      </Button>
      <VerticalSpace space="extraSmall" />
    </Container>
  );
}

export default render(Plugin);
