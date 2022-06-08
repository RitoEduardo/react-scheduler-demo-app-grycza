const dynamicFields = [
  {
    id: '1',
    type: 'textfield',
    visible: true,
    props: {
      id: 'title',
      label: 'Title',
      fullWidth: true,
      errortext: '',
      value: ''
    },
    rules: {
      validation: [
        {
          rule: 'mandatory',
          message: 'Please select a title.'
        }
      ]
    },
    layout: {
      row: 1
    }
  },
  {
    id: '2',
    type: 'datetimepicker',
    props: {
      id: 'startDate',
      margin: 'normal',
      label: 'Start Date',
      clearable: true,
      style: {
        width: '100%'
      },
      variant: 'outlined',
      format: 'yyyy-MM-dd HH:mm:ss',
      value: ''
    },
    layout: {
      row: 2,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: '3',
    type: 'datetimepicker',
    props: {
      id: 'endDate',
      margin: 'normal',
      label: 'End Date',
      clearable: true,
      style: {
        width: '100%'
      },
      variant: 'outlined',
      format: 'yyyy-MM-dd HH:mm:ss',
      value: ''
    },
    layout: {
      row: 2,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: '4',
    type: 'textfield',
    visible: true,
    props: {
      id: 'location',
      label: 'Location',
      fullWidth: true,
      value: '',
      errortext: ''
    },
    rules: {
      validation: [
        {
          rule: 'mandatory',
          message: 'Please enter location.'
        }
      ]
    },
    layout: {
      row: 3,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 7
      },
      lg: {
        col: 7
      }
    }
  }
];

export default dynamicFields;
