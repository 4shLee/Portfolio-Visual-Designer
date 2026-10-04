/* Project detail pop-up. Closes on the Close button, backdrop click, or Escape. */
const ProjectModal = {
  props: {
    project: { type: Object, required: true }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { ref, onMounted, onUnmounted } = Vue;
    const closeBtn = ref(null);
    const onKey = e => { if (e.key === 'Escape') emit('close'); };

    onMounted(() => {
      closeBtn.value && closeBtn.value.focus();
      window.addEventListener('keydown', onKey);
    });
    onUnmounted(() => window.removeEventListener('keydown', onKey));

    return { closeBtn };
  },
  template: `
    <div class="modal" @click.self="$emit('close')" role="dialog" aria-modal="true" :aria-label="project.title">
      <div class="panel">
        <button class="close" ref="closeBtn" @click="$emit('close')">Close</button>
        <div class="art" :style="{ background: project.bg }">{{ project.title[0] }}</div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.desc }}</p>
        <dl>
          <dt>Type</dt><dd>{{ project.type }}</dd>
          <dt>Year</dt><dd>{{ project.year }}</dd>
          <dt>Tools</dt><dd>{{ project.tools }}</dd>
          <dt>Finish</dt><dd>{{ project.finish }}</dd>
        </dl>
      </div>
    </div>`
};
