/**
 * Calculates the support coverage percentages for a CSS property based on its Can I Email stats.
 *
 * @param stats - The nested stats object from Can I Email data
 * @returns An object containing support, partial, and not support percentages
 */
export function computeSupportCoverage(stats: Record<string, any>) {
  let supportedCount = 0;
  let partialCount = 0;
  let notSupportedCount = 0;
  let totalCount = 0;

  // Iterate through clients (e.g., apple-mail, gmail)
  for (const client in stats) {
    const platforms = stats[client];

    // Iterate through platforms (e.g., macos, ios, android)
    for (const platform in platforms) {
      const versions = platforms[platform];

      // Iterate through versions (e.g., "15", "2022-07")
      for (const version in versions) {
        const rawStatus = versions[version];
        if (!rawStatus) continue;

        // Strip off any notes (e.g., "y #1" -> "y")
        const status = rawStatus.split(' ')[0].toLowerCase();

        if (status === 'y') {
          supportedCount++;
          totalCount++;
        } else if (status === 'a') {
          partialCount++;
          totalCount++;
        } else if (status === 'n') {
          notSupportedCount++;
          totalCount++;
        }
        // We ignore 'u' (unknown) or other statuses not in [y, a, n]
      }
    }
  }

  if (totalCount === 0) {
    return {
      support: 0,
      partial: 0,
      notSupported: 0,
    };
  }

  return {
    support: (supportedCount / totalCount) * 100,
    partial: (partialCount / totalCount) * 100,
    notSupported: (notSupportedCount / totalCount) * 100,
  };
}
