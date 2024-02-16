import { useState } from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const TagsInputBox = ({ handleTagChange, value, max = -1, placeholder }) => {
  const [tags, setTags] = useState(value);

  const handleChange = (tags) => {
    setTags(tags);
    handleTagChange(tags);
  };
  let inputProps = {
    placeholder: placeholder,
  };
  return (
    <TagsInput
      onlyUnique={true}
      value={tags}
      maxTags={max}
      inputProps={inputProps}
      onChange={handleChange}
    />
  );
};

TagsInputBox.propTypes = {
  handleTagChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  max: PropTypes.number,
  placeholder: PropTypes.string.isRequired,
};

export default TagsInputBox;
