import { Button, Dropdown, Container, render, VerticalSpace, } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
function Plugin() {
    const [value, setValue] = useState(null);
    const handleCloseButtonClick = useCallback(function () {
        emit("CLOSE");
    }, []);
    const options = [{
            value: 'Ceremonia'
        }, {
            value: 'Outdoor'
        }, {
            value: 'Mansur Gavriel'
        }];
    function handleChange(event) {
        const newValue = event.currentTarget.value;
        setValue(newValue);
    }
    ;
    function handleCreatePopulateDataButtonClick() {
        emit("CREATE_POPULATE_DATA", value);
    }
    return (h(Container, { space: "large" },
        h(VerticalSpace, { space: "large" }),
        h(Dropdown, { onChange: handleChange, options: options, value: value, variant: "border" }),
        h(VerticalSpace, { space: "large" }),
        h(Button, { fullWidth: true, onClick: handleCreatePopulateDataButtonClick }, "Populate"),
        h(VerticalSpace, { space: "extraSmall" }),
        h(Button, { fullWidth: true, onClick: handleCloseButtonClick, secondary: true }, "Close"),
        h(VerticalSpace, { space: "extraSmall" })));
}
export default render(Plugin);
