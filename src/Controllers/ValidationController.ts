export default class {
  checkForms(self, array) {
    let res = true;
    array.forEach((element) => {
      if (self.$refs[element]) {
        self.$refs[element].v$.$validate();
        res = !self.$refs[element].v$.$invalid;
      }
    });
    return res;
  }

  useValidationReset(self, array) {
    array.forEach((element) => {
      if (self.$refs[element]) {
        self.$refs[element].v$.$reset();
      }
    });
  }
}
