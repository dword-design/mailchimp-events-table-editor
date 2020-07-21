<script>
export default {
  functional: true,
  props: {
    icon: {},
    variant: { default: 'normal' },
  },
  render: context => (
    <button
      {...context.data}
      class={[
        context.$style.container,
        context.$style[`variant-${context.props.variant}`],
      ]}
      type="button"
    >
      {context.props.icon && (
        <ui-icon
          class={[
            context.$style.icon,
            { [context.$style.hasSlot]: !!context.scopedSlots.default?.() },
          ]}
          icon={context.props.icon}
        />
      )}
      {context.scopedSlots.default?.()}
    </button>
  ),
}
</script>

<style lang="scss" module>
$red: #d9534f;
$blue: #428bca;

.container {
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 0.25rem;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: 0.3s all;

  &.variant-normal {
    background: $blue;

    &:hover {
      background: darken($blue, 10%);
    }
  }

  &.variant-danger {
    background: $red;

    &:hover {
      background: darken($red, 10%);
    }
  }
}

.icon {
  &.has-slot {
    margin-right: 0.5rem;
  }
}
</style>
