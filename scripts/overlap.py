import json
from pprint import pprint

with open('../data/hafiz.json') as data_file:    
  data = json.load(data_file)

def merge(intervals):
  # merge overlapping intervals. not required, JSON is already fixed
  sorted_by_lower_bound = sorted(intervals, key=lambda tup: tup['start'])
  merged = []

  for higher in sorted_by_lower_bound:
    if not merged:
      merged.append(higher)
    else:
      lower = merged[-1]
      # test for intersection between lower and higher:
      # we know via sorting that lower[0] <= higher[0]
      if higher['start'] <= lower['end']:
        upper_bound = max(lower['end'], higher['end'])
        merged[-1] = (lower['start'], upper_bound)  # replace by merged interval
      else:
        merged.append(higher)
  return merged


def sumIntervals(intervals):
  return reduce(lambda x, interval: x + interval['end'] - interval['start'], intervals, 0)

def intersects(a,b):
  ranges = []
  i = j = 0
  while i < len(a) and j < len(b):
    a_left, a_right = a[i]['start'], a[i]['end']
    b_left, b_right = b[j]['start'], b[j]['end']
    end_pts = sorted([a_left, a_right, b_left, b_right])
    middle = [end_pts[1], end_pts[2]]

    if a_right < b_right:
      i += 1
    else:
      j += 1

    if a_right >= b_left and b_right >= a_left:
      ranges.append(middle)

  for i in range(len(ranges)-1):
    if ranges[i][1] in (ranges[i+1][0], ranges[i+1][0]-1):
      ranges[i:i+2] = [[ranges[i][0], ranges[i+1][1]]]

  # make it start, end format
  ranges = [{'start': x[0], 'end': x[1]} for x in ranges]
  return ranges

all_intervals = [(x, merge(data[x])) for x in ['arnab', 'for', 'against']]

for name, intervals in all_intervals:
  print '{}: {}'.format(name, sumIntervals(intervals))

intersections = [(name1, name2, intersects(data1, data2) ) for name1, data1 in all_intervals for name2, data2 in all_intervals]
intersections_sum = [(name1, name2, sumIntervals(intervals)) for name1, name2, intervals in intersections]
pprint(intersections_sum)
