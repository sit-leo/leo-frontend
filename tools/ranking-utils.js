export function mapFilesToPositions(positions, files) {
  return positions.map(position => ({ ...position, files }));
}

export function sortRanks(current, next) {
  if (current.sequence < next.sequence) {
    return -1;
  }
  if (current.sequence > next.sequence) {
    return 1;
  }
  return 0;
}

export default {
  mapFilesToPositions,
  sortRanks,
};
