function selectedForm(model, ModelId){
  console.log(model);
  if(model.id === ModelId){
    return 'selected'
  }
}

module.exports = selectedForm;
