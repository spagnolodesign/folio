<template>
  <Intro />
</template>

<script>

import Intro from "@/components/Intro";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Intro
  }
}
</script>
