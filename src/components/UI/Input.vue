<template>
  <div>
    <label :class="{ 'text-danger': !isValid }">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      @input="handleInput"
      :value="value"
      :placeholder="placeholder"
      @keyup="checkValidation"
      :class="{'border-danger': !isValid}"
    />
    <span v-if="!isValid" class="text-danger">Required field</span>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      isValid: true,
    };
  },
  props: {
    value:{
      type: String
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  watch: {
    isValid:function(val) {
      this.isValid = val
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    checkValidation() {
      if (this.required && !this.value) {
        this.isValid = false;
      } else{
        this.isValid = true;
      }
    }
  }
};
</script>
