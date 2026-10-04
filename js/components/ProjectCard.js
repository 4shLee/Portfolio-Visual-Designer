/* One clickable project card in the work grid. */
const ProjectCard = {
  props: {
    project: { type: Object, required: true },
    index: { type: Number, default: 0 }
  },
  emits: ['select'],
  template: `
    <button class="card" v-reveal="index" @click="$emit('select', project)" :aria-label="'Open ' + project.title">
      <div class="art" :style="{ background: project.bg }">{{ project.title[0] }}</div>
      <div class="meta">
        <h3>{{ project.title }}</h3>
        <span>{{ project.type }} · {{ project.year }}</span>
      </div>
    </button>`
};
