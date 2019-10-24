export function mapFilesToPositions(positions, files) {
  return positions.map(position => ({ ...position, files }));
}

export default {
  mapFilesToPositions,
};
