<template>
  <div class="relative my-4 select-none">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t-2 border-dashed border-gray-300" />
    </div>
    <div class="relative flex justify-start">
      <span class="pr-3 bg-white dark:bg-backdrop-dark text-lg font-medium text-gray-900 dark:text-gray-100">
        <slot />
      </span>
    </div>
  </div>
</template>
