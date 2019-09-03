/* eslint-disable class-methods-use-this */
import joi from 'joi';

class joiValidator {
  constructor(obj) {
    const joiObj = this.generateSchema(obj);
    this.schema = this.defineSchema(joiObj);
  }

  generateSchema(obj) {
    const keys = Object.keys(obj);
    const joiSchema = {};
    keys.forEach((item) => {

    });
  }

  joiFuncKeys() {
    const required = 'required';
    const string = 'string';
    const email = 'email';
    return {
      required,
      string,
      email,
    };
  }

  defineSchema(joiObj) {
    return joi.object().keys(joiObj);
    //   return joi.object().keys({
    //       email: joi.string().email().required(),
    //       password: joi.string().required(),
    //   });
  }

  async validateSchema(requestbody) {
    const value = await joi.validate(requestbody, this.schema);
    return value;
  }
}

export default joiValidator;
