def merge(L, R, lst, LL, RL, begin, end):
    if begin < end:
        if RL <= 0 or (LL > 0 and L[LL-1] > R[RL-1]):
            lst[end-1], LL = L[LL-1], LL-1
        else:
            lst[end-1], RL = R[RL-1], RL-1
        merge(L, R, lst, LL, RL, begin, end-1)


def merge_sort(lst, begin=0, end=None):
    if end is None:
        end = len(lst)

    if end - begin > 1:
        divider = (begin+end+1) // 2
        merge_sort(lst, begin, divider)
        merge_sort(lst, divider, end)
        L, R = lst[begin:divider], lst[divider:end]
        merge(L, R, lst, len(L), len(R), begin, end)


lst = [23, 44, 5, 111, 89, 56, 74, 23]
breakpoint()
merge_sort(lst)
print(lst)


def merge(L, R, lst, LL, RL, begin, end):
    if begin < end:
        if RL <= 0 or (LL > 0 and L[LL-1] > R[RL-1]):
            lst[end-1], LL = L[LL-1], LL-1
        else:
            lst[end-1], RL = R[RL-1], RL-1
        merge(L, R, lst, LL, RL, begin, end-1)


def merge_sort(lst, begin=0, end=None):
    if end is None:
        end = len(lst)

    if end - begin > 1:
        divider = (begin+end+1) // 2
        merge_sort(lst, begin, divider)
        merge_sort(lst, divider, end)
        L, R = lst[begin:divider], lst[divider:end]
        merge(L, R, lst, len(L), len(R), begin, end)


lst = [23, 44, 5, 111, 89, 56, 74, 23]
