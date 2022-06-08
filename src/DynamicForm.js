import React, { Component } from 'react';
import { FormGenerator } from 'dynamic-material-ui';
import { withStyles } from '@material-ui/core/styles';
import * as MUI from '@material-ui/core';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0
    },
    width: '50%'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  textField: {
    width: '100%'
  }
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      displayFormErrors: false
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
  }

  onSubmit(response, errors, formData) {
    if (errors.length === 0) {
      let updatedData = {};
      formData.forEach(d => {
        updatedData[d.props.id] = d.props.value;
      });
      const nextChanges = {
        ...this.getAppointmentChanges(),
        updatedData
      };
      this.setState({
        formData, //!important to reset the formData to retain the updated form values on UI,
        appointmentChanges: nextChanges,
        displayFormErrors: false //To display field errors
      });
    } else {
      this.setState({
        displayFormErrors: true //To display field errors
      });
    }
  }
  triggerSubmit(data) {
    this.formRef.click();
  }

  changeAppointment(data, e, val) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [data.props.id]: val
    };
    this.setState({
      appointmentChanges: nextChanges
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges()
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {}
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      formData,
      cancelAppointment,
      target,
      onHide
    } = this.props;
    const { appointmentChanges } = this.state;
    console.log(FormGenerator);
    for (let i = 0; i < formData.length; i++) {
      formData[i].props.value = appointmentData[formData[i].props.id]
        ? appointmentData[formData[i].props.id]
        : '';
    }

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {}
      });
      visibleChange();
      cancelAppointment();
    };
    console.log('Form Data', formData);
    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>FormData in Modal: {formData[0].props.value} </div>
        <div className={classes.header}>
          <IconButton className={classes.closeButton} onClick={cancelChanges}>
            <Close color="action" />
          </IconButton>
        </div>
        <FormGenerator
          guid="simple-form" //mandatory unique id
          data={this.props.formData}
          displayErrors={this.state.displayFormErrors} //Displays only mandatory field errors
          library={MUI}
          forceUpdate={false} //Default(false) -> Force update the form data
          patch={{
            1:
              appointmentChanges.title === undefined
                ? ''
                : appointmentChanges.title,
            2:
              appointmentChanges.startDate === undefined
                ? appointmentData.startDate
                : appointmentChanges.startDate,
            3:
              appointmentChanges.endDate === undefined
                ? appointmentData.endDate
                : appointmentChanges.endDate,
            4:
              appointmentChanges.location === undefined
                ? ''
                : appointmentChanges.location,
            5:
              appointmentChanges.destination === undefined
                ? ''
                : appointmentChanges.destination,
            6:
              appointmentChanges.service === undefined
                ? ''
                : appointmentChanges.service
          }} //pass patch to update the data partially {"1": "Name"}
          onChange={this.changeAppointment}
          formRef={form => {
            this.formRef = form;
          }}
          onSubmit={this.onSubmit}
        />

        <div className={classes.buttonGroup}>
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                this.commitAppointment('deleted');
              }}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              this.triggerSubmit();
              applyChanges();
            }}
          >
            {isNewAppointment ? 'Create' : 'Save'}
          </Button>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, {
  name: 'AppointmentFormContainer'
})(AppointmentFormContainerBasic);

export default AppointmentFormContainer;
