import fs from 'node:fs'
import path from 'node:path'

type File = {
  name: string
  parentFolder: string
  folderPath: string
  size: number
}

/**
 * Function to recursively scan the disk drive for movie files
 * @param {string} rootFolderPath eg: /data
 * @param {string | string[]} searchExtensions eg: '.mkv' | ['.mp4', '.mkv', '.avi']
 * @returns Array of file object
 */
export function scanDiskDrive(rootFolderPath: string, searchExtensions: string | string[]): File[] {
  const files: File[] = []

  if (typeof searchExtensions === 'string') {
    searchExtensions = [searchExtensions]
  }

  function scanFolder(folderPath: string) {
    const folderContents = fs.readdirSync(folderPath, { withFileTypes: true })

    for (const item of folderContents) {
      const itemPath = path.join(folderPath, item.name)
      if (item.isDirectory()) {
        scanFolder(itemPath) // Recursively scan subfolder
      } else if (item.isFile()) {
        const extension = path.extname(item.name).toLowerCase()
        if (searchExtensions.includes(extension)) {
          try {
            const stats = fs.statSync(itemPath)
            files.push({
              name: item.name,
              parentFolder: folderPath.split('/').at(-1)!,
              folderPath,
              size: stats.size,
            })
          } catch (error: unknown) {
            if (error instanceof Error)
              console.error(`Error getting stats for file ${itemPath}:`, error.message)
          }
        }
      }
    }
  }

  scanFolder(rootFolderPath)
  return files
}
