export default props => {
  if (props.condition) {
    return props.render ? props.render() : props.children
  }
  return null
}
