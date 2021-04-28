const { collection } = require('forest-express-mongoose');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('cabinets', {
  actions: [{ 
    name: 'Update Theme',
    type: 'single',
    endpoint: '/forest/actions/cabinets/update-theme',
    fields: [{
      field: 'Logo',
      description: 'Public URL to the Logo',
      type: 'String',
      isRequired: true
    }, {
      field: 'Main Color',
      type: 'String',
      isRequired: true,
      widget: 'color editor'
    }, {
      field: 'Secondary Color',
      type: 'String',
      isRequired: true,
      widget: 'color editor'
    }],
    hooks: {
      load: ({ fields, record }) => {
        fields['Logo'].value = record.themeLogo;
        fields['Main Color'].value = record.themeMainColor;
        fields['Secondary Color'].value = record.themeSecondaryColor;
        return fields;
      },
    },    
  }],
  fields: [{
    field: 'locationType',
    type: 'String',
  }, {
    field: 'locationCoordinates0',
    type: 'Number',
  }, {
    field: 'locationCoordinates1',
    type: 'Number',
  }, {
    field: 'locationCoordinatesForest',
    type: 'String',
    get: (cabinet) => {
      if (!cabinet.location || !cabinet.location.coordinates || !cabinet.location.coordinates.length) return null;
      return `${cabinet.location.coordinates[0]}, ${cabinet.location.coordinates[1]}`;
    }
  }, {
    field: 'locationFormattedAddress',
    type: 'String',
  }, {
    field: 'locationStreet',
    type: 'String',
  }, {
    field: 'locationCity',
    type: 'String',
  }, {
    field: 'locationState',
    type: 'String',
  }, {
    field: 'locationZipcode',
    type: 'String',
  }, {
    field: 'locationCountry',
    type: 'String',
  }, {
    field: 'themeLogo',
    type: 'String',
  }, {
    field: 'themeMainColor',
    type: 'String',
  }, {
    field: 'themeSecondaryColor',
    type: 'String',
  }],
  segments: [],
});
