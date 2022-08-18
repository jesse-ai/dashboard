<template>
  <div class="container select-none">
    <div class="text-center mt-16">
      <h3>
        Need help? Check out the <a href="http://docs.jesse.trade"
                                    class="text-indigo-600 dark:text-indigo-400 hover:underline"
                                    target="_blank">
          docs
        </a>
        or search the help center:
      </h3>
    </div>

    <HelpSearch />

    <div>
      <ul role="list" class="border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li v-for="(item, itemIdx) in items" :key="itemIdx" class="flow-root">
          <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500">
            <div :class="[item.background, 'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg']">
              <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                <a :href="item.url" target="_blank" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  {{ item.title }}<span aria-hidden="true"> &rarr;</span>
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  CalendarIcon,
  AcademicCapIcon,
  CodeIcon,
  FilmIcon,
  UserGroupIcon,
  NewspaperIcon
} from '@heroicons/vue/outline'
import HelpSearch from '@/views/HelpSearch'

export default {
  name: 'Dashboard',
  components: {
    HelpSearch
  },
  data () {
    return {
      items: [
        {
          title: 'Documentation',
          description: 'Our friendly documentation is the best place to find information about Jesse',
          icon: AcademicCapIcon,
          background: 'bg-pink-500',
          url: 'https://docs.jesse.trade/'
        },
        {
          title: 'Tutorials',
          description: 'Learn by watching the creator of Jesse writing strategies step-by-step',
          icon: FilmIcon,
          background: 'bg-yellow-500',
          url: 'https://jesse.trade/youtube/'
        },
        {
          title: 'Discord',
          description: 'Join our friendly Discord community filled with awesome quants',
          icon: UserGroupIcon,
          background: 'bg-green-500',
          url: 'https://jesse.trade/discord'
        },
        {
          title: 'Github',
          description: 'Curios to see the source code?',
          icon: CodeIcon,
          background: 'bg-blue-500',
          url: 'https://github.com/jesse-ai/jesse'
        },
        {
          title: 'News',
          description: 'Keep up with our latest developments',
          icon: NewspaperIcon,
          background: 'bg-indigo-500',
          url: 'https://jesse.trade/blog/news'
        },
        {
          title: 'Roadmap',
          description: 'Wanna know what’s coming next and when?',
          icon: CalendarIcon,
          background: 'bg-purple-500',
          url: 'https://docs.jesse.trade/docs/roadmap.html'
        },
      ]
    }
  },
  computed: {},
}
</script>
