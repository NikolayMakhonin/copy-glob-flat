/** Copy files to single directory with auto rename duplicates */
export declare function copyGlobFlat({ destDir, globs, }: {
    destDir: string;
    /** globby patterns */
    globs: string[];
}): Promise<void>;
