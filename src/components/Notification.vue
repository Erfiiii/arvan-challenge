<template>
  <div
    v-click-outside='closeNotification'
    role="alert"
    :class="{
      'is-active': status,
      'alert-success': isSuccess,
      'alert-danger': isDanger
    }"
    class="animate-alert alert float-right flex"
  >
    <span class="text-left mr-3">{{ message }}</span>
    <button
      @click="closeNotification"
      type="button"
      class="close"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: false,
      type: null,
      message: ""
    };
  },
  mounted() {
    this.$root.$on(
      "shouldDisplayNotification",
      function(vm) {
        this.type = vm.type;
        this.message = vm.message;
        this.show();
      }.bind(this)
    );
  },
  computed: {
    isSuccess() {
      return this.type === "SUCCESS";
    },
    isDanger() {
      return this.type === "DANGER";
    }
  },
  methods: {
    show() {
      this.status = true;
    },
    closeNotification() {
      this.status = false;
    }
  }
};
</script>

<style>
.alert {
  display: none;
  position: fixed !important;
  right: 20px;
  top: 60px;
  z-index: 100000001;
}

@media (max-width: 550px) {
.alert {
  width: 100%;
  right: 0;
  left: 0;
  bottom: 0;
  top: auto;
}
}

.alert.is-active {
  display: block;
}

@keyframes alertAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-alert {
  opacity: 1;
  animation: alertAnimation 1s;
}
</style>
