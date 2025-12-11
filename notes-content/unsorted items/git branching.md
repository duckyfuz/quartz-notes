> [!tip] referenced from  https://learngitbranching.js.org/
> > [!bug] has issues with the vimium extension
##### what i've learnt
- `HEAD` always points to the most recent commit in the working tree
- we can use both `^` eg. `git checkout feat/tst^` and `HEAD~x` eg. `git checkout HEAD~1`
	- `git checkout HEAD^` also works! it just refers to the parent node
- `git cherry-pick <commit1> <commit2> <...>`
	- plops down the commits after `HEAD`
- `git rebase -i HEAD~x` for an interactive reordering / dropping of prior commits
	- eg. suppose we add debugging statements in `<commit1>` - then we can `rebase -i` or `cherry-pick` to 'remove' the `<commit1>`
- to make amends to a commit way in the past
	- (1) `rebase -i HEAD~x` to bring the commit to the front, (2) `git commit --amend`, (3) `rebase -i HEAD~x` again
	- but there are possibilities of rebase conflicts - can consider `cherry-pick` -> `amend` -> `cherry-pick`
- `git tag <name> <commit1>` (`<commit1>` is `HEAD` by default if left out)
	- serves as "anchors"
	- `git describe` to receive `<tag>_<numCommits>_g<hash>`
		- `tag` is the closest ancestor tag in history, `numCommits` is how many commits away that tag is, and `<hash>` is the hash of the commit being described
- `git checkout HEAD^2` can select the 2nd parent from a merge