import React from "react";
import PropTypes from "prop-types";
import SaveNoteButton from "./SaveNoteButton";
import { LocaleConsumer } from "../contexts/LocaleContext";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      maxChar: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    if (this.state.maxChar >= 0 && event.target.value.length <= 50) {
      this.setState(() => {
        return {
          title: event.target.value,
          maxChar: 50 - event.target.value.length,
        };
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState(() => {
      return {
        title: "",
        body: "",
        maxChar: 50,
      };
    });
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form
              className="add-new-page__input"
              onSubmit={this.onSubmitEventHandler}
            >
              <p className="add-new-page__input__title__char-limit">
                {locale === "id" ? "Sisa karakter: " : "Characters left: "}
                {this.state.maxChar}
              </p>
              <input
                className="add-new-page__input__title"
                type="text"
                placeholder={
                  locale === "id"
                    ? "Masukkan judul catatan"
                    : "Enter note title"
                }
                value={this.state.title}
                onChange={this.onTitleChangeEventHandler}
              />
              <textarea
                className="add-new-page__input__body"
                type="text"
                placeholder={
                  locale === "id"
                    ? "Masukkan detail catatan"
                    : "Enter note detail"
                }
                value={this.state.body}
                onChange={this.onBodyChangeEventHandler}
              ></textarea>
              <div className="add-new-page__action">
                <SaveNoteButton />
              </div>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
