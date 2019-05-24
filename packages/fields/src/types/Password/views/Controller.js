import FieldController from '../../../Controller';

export default class PasswordController extends FieldController {
  getFilterGraphQL = ({ type, value }) => {
    return `${this.path}_${type}: ${value ? 'true' : 'false'}`;
  };
  getFilterLabel = () => {
    return `${this.label}`;
  };
  formatFilter = ({ value }) => {
    return `${this.label} ${value ? 'is set' : 'is not set'}`;
  };

  // Passwords don't expose their own value like most fields
  getQueryFragment = () => `${this.path}_is_set`;

  getFilterTypes = () => [
    {
      type: 'is_set',
      label: 'Is Set',
      getInitialValue: () => true,
    },
  ];

  serialize = data => {
    // discard the "confirm" since we only need one version of the password
    return data[this.path] ? data[this.path].inputPassword : undefined;
  };

  validateInput = ({ originalInput, addFieldValidationError, addFieldValidationWarning }) => {
    if (originalInput[this.path].inputPassword !== originalInput[this.path].inputConfirm) {
      addFieldValidationError('Passwords do not match');
    }

    // TODO
    //const MIN_LENGTH = 8;

    //if (originalInput[this.path].inputPassword.length < MIN_LENGTH) {
    //  addFieldValidationError(`Password must be at least ${MIN_LENGTH} characters`);
    //}
  };
}
