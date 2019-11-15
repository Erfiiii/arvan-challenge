<template>
  <div
    class="modal fade"
    id="modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    open() {
      $("#modal").modal("toggle");
      this.$emit("open");
    },
    close() {
      $("#modal").modal("hide");
      this.$emit("close");
    }
  }
};
</script>
