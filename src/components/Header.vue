<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1">
    <div>
      <span class="navbar-brand d-inline col-sm-3 col-md-2 mr-0"
        >Arvan challenge</span
      >
      <span class="text col-sm-3 col-md-2 d-inline text-white font-weight-light"
        >Wellcome {{username}}</span
      >
    </div>
    <ul class="navbar-nav px-3 py-2">
      <li class="nav-item text-nowrap">
        <button
          class="nav-link btn text-info py-1 px-2 rounded border border-info"
        >
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: {
    username: {
      type: String
    }
  }
};
</script>
