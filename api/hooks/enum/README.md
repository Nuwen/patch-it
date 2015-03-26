# fw Extended Models

This hook extends the models, its definition and its behaviour.

For now, various features will get added in this hook. And we will migrate them to proper ones, as we go by.

## Extended enum support ##

This feature extends the values of enum from other sources. Other sources could be:

### Usage ###

```javascript
{
	attributes: {
		name: 'string',
		country: {
			type: 'string',
			enum: []
		},
		fees: {
			type: 'integer',
			enum: [],
			enum_options: { model: 'regmaster', fields: ['amount'] }
		}
	},

  ext_attributes: {
      country: { enum_options: { identity: 'country' } }
  }
}
```


All options are specified using **enum_options**. The property *enum_options* can be specified under *attributes* or under *ext_attributes*

1. JSON file (*identity*)

   * All files with *.enum.json are loaded automatically
   * Identity name (identify.enum.json) is specified using property **identity** (specified within *enum_options*)
   * You typically do this, if you want to share the enum options among diff models or if the number of enum options are large and hence needs to be kept in a separate file
   * The property **enum** can be kept empty, and is merged from the JSON file

2. From another Model (*model*, *fields*)

   * The enum options are the name of the **model** and the **fields** from where they need to be fetched
   * These values are obtained dynamically, every time when the validation is requested
   * This function will update the *enum* property with the latest values, so the validations can happen correctly

