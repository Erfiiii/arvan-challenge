<template>
  <div class>
    <div class="row">
      <main class="main flex col-md-9 ml-sm-auto col-lg-10 px-4" role="main">
        <div
          v-if="isLoading"
          class="row justify-content-center align-items-center"
          style="height:100vh"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div
          v-else
          class="justify-content-between full-width align-items-center pt-3 pb-2 mb-3"
        >
          <h1 class="h2 w-100">Edit Article</h1>
          <form class="d-lg-flex d-md-flex mt-4">
            <div class="col-sm-12 col-md-7 col-lg-7 mr-5 p-0">
              <div class="form-group">
              <input-cm label="Title" type="text" :required="true" placeholder="Title" v-model="title"/>
              </div>

              <div class="form-group">
              <input-cm label="Description" type="text" :required="true" placeholder="Description" v-model="description"/>
              </div>

              <div class="form-group">
                <label>Body</label>
                <textarea v-model="body" class="body form-control"></textarea>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 p-0">
              <div class="form-group">
                <label>Tags</label>
                <input
                  v-model="tag"
                  type="text"
                  class="form-control"
                  placeholder="New Tag"
                />
              </div>
              <div class="form-group tag-list border border-black rounded p-3">
                <div
                  class="custom-control custom-checkbox my-1 mr-sm-2"
                  v-for="(tag, i) in tagList"
                  :key="i"
                >
                  <input
                    type="checkbox"
                    v-model="selectedTags"
                    class="custom-control-input"
                    :id="i"
                    :value="tag"
                  />
                  <label class="custom-control-label" :for="i">{{ tag }}</label>
                </div>
              </div>
            </div>
          </form>
          <button
            @click.prevent="onEditArticle"
            type="submit"
            class="btn btn-primary"
          >
          <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>Submit</span>
          </button>
        </div>
        <div
          class="justify-content-between full-width align-items-center pt-3 pb-2 mb-3"
        ></div>
      </main>
    </div>
  </div>
</template>

<script>
import { HttpService } from "../../services/apiService";
import { Endpoints } from "../../services/apiService/routes";

import InputCm from "../../components/UI/Input";


export default {
  name: "editArticle",
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tag: "",
      tagList: [],
      selectedTags: [],
      isLoading: false,
      tagLoading: false
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    }
  },
  components: {
    InputCm
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.getTags();
      let { article } = await HttpService.getRequest(
        Endpoints.get(Endpoints.ROUTE_GET_ARTICLE_BY_SLUG, { slug: this.slug })
      );
      this.title = article.title;
      this.description = article.description;
      this.body = article.body;
      this.selectedTags = article.tagList;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  },
  methods: {
    async getTags() {
      try {
        this.tagLoading = true;
        let response = await HttpService.getRequest(
          Endpoints.get(Endpoints.ROUTE_GET_TAGS)
        );
        this.tagList = response.tags;
        this.tagLoading = false;
      } catch (error) {
        this.tagLoading = false;

        throw error;
      }
    },
    async onEditArticle() {
      try {
        this.isLoading = true;
        this.selectedTags.push(this.tag);

        let data = {
          article: {
            title: this.title,
            body: this.body,
            description: this.description,
            tagList: this.selectedTags
          }
        };
        await HttpService.putRequest(
          Endpoints.get(Endpoints.ROUTE_EDIT_ARTICLE, { slug: this.slug }),
          data
        );
        this.$router.push({ name: "ROUTE_HOME" });
        this.isLoading = false;
        this.displayNotification('SUCCESS', 'Well done! Article updated successfuly')
      } catch (error) {
        this.isLoading = false;
        throw error;
      }
    }
  }
};
</script>

<style scoped>
.main {
  padding-top: 48px !important;
}

@media (min-width: 381px) {
  [role="main"] {
    padding-top: 58px;
  }
}

@media (max-width: 550px) {
  .main {
    padding-top: 133px !important;
  }
}

.tag-list {
  max-height: 330px;
  overflow-y: scroll;
}

.body {
  min-height: 200px;
}

.custom-control-label::before {
  background-color: #dddddd;
  border: none;
}
</style>
