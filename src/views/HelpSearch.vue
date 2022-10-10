<template>
  <!-- search section -->
  <div class="w-full flex justify-center">
    <div class="mb-4 mt-8 px-2 w-full md:w-2/3">
      <div class="relative">
        <div class="absolute left-2 inset-y-0 pl-3 flex items-center">
          <svg
            class="fill-current h-6 w-6 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </div>

        <input
          v-model="query"
          class="w-full pl-14 pr-4 py-4 rounded-full outline-none border-2 border-gray-200 focus:border-indigo-600 focus:ring-0 dark:bg-gray-800 dark:border-gray-900"
          type="search"
          placeholder="Search..."
          @input="typing = true"
        >
      </div>
      <div
        v-if="query"
        class="relative"
      >
        <!-- loading -->
        <div
          v-if="loading"
          class="w-full absolute bg-white p-2 mt-2 border border-gray-300 rounded shadow-md z-50"
        >
          <div class="py-4 px-4 text-gray-600">
            Searching ...
          </div>
        </div>

        <!-- error message -->
        <div
          v-else-if="error && showResults"
          class="w-full absolute bg-white p-2 mt-2 border border-gray-300 rounded shadow-md"
        >
          <div
            class="py-4 px-4 text-gray-600 flex items-center text-sm md:text-base"
          >
            <span class="mr-4 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </span>
            Something went wrong.
          </div>
        </div>

        <!-- search result -->
        <div
          v-else-if="results.length != 0 && showResults"
          class="w-full absolute bg-white px-2 py-2 mt-2 rounded shadow-lg border border-gray-300 max-h-64 overflow-y-auto z-50"
        >
          <div
            v-for="item in results"
            :key="item.id"
          >
            <a :href="'https://jesse.trade/help/faq/' + item.slug" target="_blank">
              <div
                class="px-2 py-4 rounded text-gray-600 hover:bg-indigo-500 hover:text-white"
              >
                {{ item.title }}
              </div>
            </a>
          </div>

          <div class="flex justify-end p-2">
            <img
              src="@/assets/imgs/search-by-algolia-light-background.svg"
              alt="search by Algolia"
            >
          </div>
        </div>

        <div
          v-else-if="results.length === 0 && showResults"
          class="w-full absolute bg-white p-2 mt-2 border border-gray-300 rounded shadow-md z-50"
        >
          <div
            class="py-4 px-4 text-gray-600 flex items-center text-sm md:text-base"
          >
            <span
              class="mr-4 text-yellow-300"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              /></svg></span>
            No items were found for the entered phrase.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
  data () {
    return {
      showResults: false,
      loading: false,
      error: false,
      results: '',
      typing: false,
      query: '',
    }
  },
  watch: {
    query: _.debounce(function () {
      this.typing = false
    }, 1000),
    typing: function (value) {
      if (!value && this.query) {
        this.searchProducts(this.query)
      } else if (this.results && this.query.length === 0) {
        this.results = []
        this.showResults = false
      }
    },
  },
  methods: {
    searchProducts (item) {
      this.error = false
      this.loading = true
      axios
        .get('https://jesse.trade/api/help/search', { params: { item } })
        .then((response) => {
          this.showResults = true
          this.results = response.data
          this.loading = false
        })
        .catch(() => {
          this.showResults = true
          this.loading = false
          this.error = true
        })
    },
  },
}
</script>
