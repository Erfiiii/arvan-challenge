import Vue from "vue";

export default Vue.mixin({
  methods: {
    displayNotification: function(type, message) {
      this.$root.$emit("shouldDisplayNotification", {
        type,
        message
      });
    },
    hideNotification: function() {
      this.$root.$emit("shouldHideNotification");
    }
  }
})