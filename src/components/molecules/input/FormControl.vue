<template>
  <div class="form-control">
    <div class="flex justify-between mb-1">
      <label class="label p-0">
        <span class="label-text">{{ label }}</span>
      </label>
      <span v-if="invalid" class="text-red-400 text-sm">
        {{ error }}
      </span>
    </div>
    <input
      v-if="
        type === 'text' ||
        type === 'number' ||
        type === 'email' ||
        type === 'password'
      "
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('submit')"
      :placeholder="placeholder"
      class="input input-bordered mb-1"
      :class="inputClass"
    />
    <select
      v-if="type === 'select'"
      class="input input-bordered mb-1"
      :class="inputClass"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('submit')"
      :placeholder="placeholder"
    >
      <option v-for="(item, index) in arr" :key="index" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <flatPickr
      v-if="type === 'date'"
      class="input input-bordered mb-1"
      :class="inputClass"
      v-model="modelValue"
      :config="config"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('submit')"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from "@vuelidate/validators";
import {$t} from "@mixins"
export default {
  components: {
    flatPickr,
  },
  emits: ["update:modelValue", "submit"],
  props: {
    modelValue: {
      type: String,
    },
    config: {
      type: Object,
      default: () => ({
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "Y-m-d",
        maxDate: new Date(),
      }),
    },
    arr: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "Label",
    },
    placeholder: {
      type: String,
      default: "Placeholder",
    },
    rules: {
      type: Array,
      default: () => [],
    },
    inputClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    invalid() {
      return this.v$ && this.v$.$invalid;
    },
    error() {
      let res = "";
      if (this.v$ && this.v$.$errors.length > 0) {
        switch (this.v$.$errors[0].$validator) {
          case "required":
            res = this.$t("This field is required");
            break;
        
          default:
            break;
        }
      }
      return res;
    },
  },
  validations() {
    return {
      modelValue: {
        required: this.rules.indexOf("required") >= 0 ? required : false,
        email: this.rules.indexOf("email") >= 0 ? email : false,
        minLength: this.rules.indexOf("minLength") >= 0 ? minLength(8) : false,
        maxLength: this.rules.indexOf("maxLength") >= 0 ? maxLength(20) : false,
        minValue: this.rules.indexOf("minValue") >= 0 ? minValue(8) : false,
        maxValue: this.rules.indexOf("maxValue") >= 0 ? maxValue(20) : false,
      },
    };
  },
  methods:{
    $t,
  }
};
</script>