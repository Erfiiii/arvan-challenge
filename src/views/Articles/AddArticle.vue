<template>
  <div class>
    <div class="row">
      <main class="main flex col-md-9 ml-sm-auto col-lg-10 px-4" role="main">
        <div
          class="justify-content-between full-width align-items-center pt-3 pb-2 mb-3"
        >
          <h1 class="h2 w-100">New Article</h1>
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
                  @blur="pushNewTag"
                />
              </div>
              <div class="form-group border tag-list border-black rounded p-3">
                <div v-if="tagLoading" class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div
                  v-else
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
            @click.prevent="createArticle"
            type="submit"
            class="btn btn-primary"
            style="width:90px"
          >
          <span v-if="loadingState" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
import errorHandler from "../../services/exceptions";

import InputCm from "../../components/UI/Input";

export default {
  name: "addArticle",
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tag: "",
      tagList: [],
      selectedTags: [],
      tagLoading: false,
      loadingState: false
    };
  },
  components: {
    InputCm
  },
  async mounted() {
    try {
      this.tagLoading = true;
      let response = await HttpService.getRequest(
        Endpoints.get(Endpoints.ROUTE_GET_TAGS)
      );
      this.tagList = this.presentTags(response.tags);
      this.tagLoading = false;
    } catch (error) {
      this.tagLoading = false;

      throw error;
    }
  },
  methods: {
    async createArticle() {
      try {
        this.loadingState = true;
        
        let data = {
          article: {
            title: this.title,
            body: this.body,
            description: this.description,
            tagList: this.selectedTags
          }
        };
        await HttpService.postRequest(
          Endpoints.get(Endpoints.ROUTE_ADD_ARTICLE),
          data
        );
        this.$router.push({ name: "ROUTE_HOME" });
        this.loadingState = false;
        this.displayNotification('SUCCESS', 'Well done! Article created successfuly')
      } catch (error) {
        this.displayNotification('DANGER', errorHandler(error).message)
        this.loadingState = false;
        throw error;
      }
    },
    pushNewTag() {
      if(this.tag) {
        this.tagList.unshift(this.tag);
        this.selectedTags.push(this.tag);
        this.tag = null;
      }
    },
    presentTags(tags) {
      tags.sort(function (a, b) {
          if (a > b) {
              return 1;
          }
          if (b > a) {
              return -1;
          }
          return 0;
      });
      return tags;
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

/* @media (max-width: 550px) {
  .main {
    padding-top: 133px !important;
  }
} */

.body {
  min-height: 200px;
}

.tag-list {
  max-height: 330px;
  overflow-y: scroll;
}

.custom-control-label::before {
  background-color: #dddddd;
  border: none;
}
</style>
