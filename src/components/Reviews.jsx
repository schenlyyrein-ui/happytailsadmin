import React, { useMemo, useState } from 'react';
import './Reviews.css';

const REVIEW_FILTERS = ['All Reviews', 'Grooming', 'Boarding', 'Birthday Party', 'Orders'];
const STAR_FILTERS = ['All Ratings', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

const initialReviews = [
  {
    id: 'REV-001',
    customerName: 'Sarah Chen',
    service: 'Grooming Service',
    category: 'Grooming',
    rating: 5,
    score: '5/5',
    date: 'March 10, 2026',
    petName: 'Bella',
    review: 'Super bait ng staff at very maingat sila sa grooming ni Bella. Babalik kami ulit.',
    adminResponse: '',
    wouldRecommend: true,
    transaction: {
      reference: 'BID #0035',
      serviceName: 'Dog Grooming Deluxe',
      bookedDate: 'March 10, 2026',
      time: '10:00 AM - 11:00 AM',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      total: 'P850.00'
    }
  },
  {
    id: 'REV-002',
    customerName: 'Miguel Santos',
    service: 'Pet Boarding',
    category: 'Boarding',
    rating: 5,
    score: '5/5',
    date: 'March 9, 2026',
    petName: 'Max',
    review: 'Malinis yung boarding area and may updates ako na-receive habang naka-check in si Max.',
    adminResponse: 'Thank you, Miguel. We are glad Max had a comfortable stay with us.',
    wouldRecommend: true,
    transaction: {
      reference: 'BID #0033',
      serviceName: 'Boarding',
      bookedDate: 'March 9, 2026',
      time: '6:00 PM - Next Day 9:00 AM',
      paymentMethod: 'GCash',
      paymentStatus: 'Paid',
      total: 'P1,299.00'
    }
  },
  {
    id: 'REV-003',
    customerName: 'Alyssa Rivera',
    service: 'Shop Order',
    category: 'Orders',
    rating: 5,
    score: '5/5',
    date: 'March 8, 2026',
    petName: 'N/A',
    review: 'Ang dali mag order sa shop at mabilis dumating. Quality din yung products.',
    adminResponse: '',
    wouldRecommend: true,
    transaction: {
      reference: 'ORD001',
      serviceName: 'Pet Shop Order',
      bookedDate: 'March 8, 2026',
      time: 'ASAP Delivery',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      total: 'P1,250.00'
    }
  },
  {
    id: 'REV-004',
    customerName: 'Paolo Lim',
    service: 'Boarding Service',
    category: 'Boarding',
    rating: 4,
    score: '4/5',
    date: 'March 6, 2026',
    petName: 'Coco',
    review: 'Very responsive ang team and okay ang check-in process. Sana may mas marami pang photo updates next time.',
    adminResponse: 'Thanks for the note, Paolo. We are improving our update process for boarding stays.',
    wouldRecommend: true,
    transaction: {
      reference: 'BID #0031',
      serviceName: 'Boarding',
      bookedDate: 'March 6, 2026',
      time: '8:00 AM - 5:00 PM',
      paymentMethod: 'GCash',
      paymentStatus: 'Paid',
      total: 'P999.00'
    }
  },
  {
    id: 'REV-005',
    customerName: 'Kim dela Rosa',
    service: 'Pet Birthday Package',
    category: 'Birthday Party',
    rating: 5,
    score: '5/5',
    date: 'March 5, 2026',
    petName: 'Mochi',
    review: 'Ang ganda ng setup and sobrang saya ng birthday ni Mochi. Complete din yung package inclusions.',
    adminResponse: '',
    wouldRecommend: true,
    transaction: {
      reference: 'BID #0036',
      serviceName: 'Birthday Party Gold Package',
      bookedDate: 'March 5, 2026',
      time: '3:00 PM - 7:00 PM',
      paymentMethod: 'GCash',
      paymentStatus: 'Down Payment',
      total: 'P2,000.00'
    }
  }
];

function Reviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Reviews');
  const [starFilter, setStarFilter] = useState('All Ratings');
  const [reviews, setReviews] = useState(initialReviews);
  const [responseDrafts, setResponseDrafts] = useState(() => (
    Object.fromEntries(initialReviews.map((review) => [review.id, review.adminResponse]))
  ));
  const [editingResponses, setEditingResponses] = useState(() => (
    Object.fromEntries(initialReviews.map((review) => [review.id, !review.adminResponse]))
  ));
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = reviews.filter((review) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = review.customerName.toLowerCase().includes(search)
      || review.service.toLowerCase().includes(search)
      || review.review.toLowerCase().includes(search)
      || review.transaction.reference.toLowerCase().includes(search);
    const matchesCategory = categoryFilter === 'All Reviews' || review.category === categoryFilter;
    const matchesStar = starFilter === 'All Ratings' || review.rating === Number(starFilter.charAt(0));

    return matchesSearch && matchesCategory && matchesStar;
  });

  const reviewStats = useMemo(() => {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';
    const recommendedCount = reviews.filter((review) => review.wouldRecommend).length;
    const recommendationRate = totalReviews > 0 ? Math.round((recommendedCount / totalReviews) * 100) : 0;
    const fiveStarCount = reviews.filter((review) => review.rating === 5).length;

    return {
      averageRating,
      totalReviews,
      recommendationRate,
      fiveStarCount
    };
  }, [reviews]);

  const handleDraftChange = (reviewId, value) => {
    setResponseDrafts((prev) => ({ ...prev, [reviewId]: value }));
  };

  const handleSaveResponse = (reviewId) => {
    const nextResponse = (responseDrafts[reviewId] || '').trim();
    setReviews((prev) => prev.map((review) => (
      review.id === reviewId ? { ...review, adminResponse: nextResponse } : review
    )));
    setEditingResponses((prev) => ({ ...prev, [reviewId]: false }));
  };

  return (
    <div className="reviews-container">
      <section className="reviews-hero-card">
        <div className="reviews-hero-copy">
          <h1 className="reviews-title">Community Reviews</h1>
          <p className="reviews-subtitle">Customer feedback, service insights, and transaction context for the admin team.</p>
        </div>

        <div className="reviews-summary-grid">
          <div className="reviews-summary-tile">
            <strong>{reviewStats.averageRating}/5</strong>
            <span>Average Rating</span>
          </div>
          <div className="reviews-summary-tile">
            <strong>{reviewStats.totalReviews.toLocaleString()}</strong>
            <span>Total Reviews</span>
          </div>
          <div className="reviews-summary-tile">
            <strong>{reviewStats.recommendationRate}%</strong>
            <span>Would Recommend</span>
          </div>
          <div className="reviews-summary-tile">
            <strong>{reviewStats.fiveStarCount}</strong>
            <span>Five-Star Reviews</span>
          </div>
        </div>
      </section>

      <section className="reviews-toolbar">
        <input
          type="text"
          className="reviews-search-input"
          placeholder="Search reviews, transaction IDs, services, or customer names..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="reviews-filter-row">
          {REVIEW_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`reviews-filter-chip ${categoryFilter === filter ? 'active' : ''}`}
              onClick={() => setCategoryFilter(filter)}
            >
              {filter}
            </button>
          ))}
          <select
            className="reviews-filter-select"
            value={starFilter}
            onChange={(event) => setStarFilter(event.target.value)}
          >
            {STAR_FILTERS.map((filter) => (
              <option key={filter}>{filter}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="reviews-grid">
        {filteredReviews.map((review) => (
          <article key={review.id} className="review-card">
            <div className="review-card-header">
              <div className="review-customer">
                <div className="review-avatar">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <h2>{review.customerName}</h2>
                  <p>{review.service}</p>
                </div>
              </div>
              <div className="review-score-pill">{review.score}</div>
            </div>

            <div className="review-meta-row">
              <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
              </div>
              <button
                type="button"
                className="review-details-btn"
                onClick={() => setSelectedReview(review)}
              >
                View Details
              </button>
            </div>

            <p className="review-text">{review.review}</p>

            <div className="review-detail-row">
              <span>{review.date}</span>
              <span>{review.category}</span>
              <span>Pet: {review.petName}</span>
            </div>

            <div className="review-response-block">
              <label htmlFor={review.id}>Admin Response</label>
              {editingResponses[review.id] ? (
                <>
                  <textarea
                    id={review.id}
                    rows="3"
                    placeholder="Write a response for this review..."
                    value={responseDrafts[review.id] || ''}
                    onChange={(event) => handleDraftChange(review.id, event.target.value)}
                  />
                  <div className="review-response-actions">
                    {review.adminResponse && (
                      <button
                        type="button"
                        className="review-secondary-btn"
                        onClick={() => {
                          setResponseDrafts((prev) => ({ ...prev, [review.id]: review.adminResponse }));
                          setEditingResponses((prev) => ({ ...prev, [review.id]: false }));
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      className="review-save-btn"
                      onClick={() => handleSaveResponse(review.id)}
                    >
                      {review.adminResponse ? 'Update Response' : 'Send Response'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="review-response-preview">
                  <span className="review-response-tag">Responded</span>
                  <p>{review.adminResponse}</p>
                  <div className="review-response-actions">
                    <button
                      type="button"
                      className="review-secondary-btn"
                      onClick={() => setEditingResponses((prev) => ({ ...prev, [review.id]: true }))}
                    >
                      Edit Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {selectedReview && (
        <div className="reviews-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="reviews-modal" onClick={(event) => event.stopPropagation()}>
            <div className="reviews-modal-header">
              <div>
                <h2>Review Details</h2>
                <p>{selectedReview.customerName} • {selectedReview.transaction.reference}</p>
              </div>
              <button type="button" className="reviews-modal-close" onClick={() => setSelectedReview(null)}>
                ×
              </button>
            </div>

            <div className="reviews-modal-body">
              <div className="reviews-modal-grid">
                <div className="reviews-modal-card">
                  <h3>Customer Review</h3>
                  <p><strong>Service:</strong> {selectedReview.service}</p>
                  <p><strong>Pet:</strong> {selectedReview.petName}</p>
                  <p><strong>Date Submitted:</strong> {selectedReview.date}</p>
                  <p><strong>Rating:</strong> {selectedReview.score}</p>
                  <p className="reviews-modal-copy">{selectedReview.review}</p>
                </div>

                <div className="reviews-modal-card">
                  <h3>Transaction Details</h3>
                  <p><strong>Reference:</strong> {selectedReview.transaction.reference}</p>
                  <p><strong>Booked Service:</strong> {selectedReview.transaction.serviceName}</p>
                  <p><strong>Date:</strong> {selectedReview.transaction.bookedDate}</p>
                  <p><strong>Time:</strong> {selectedReview.transaction.time}</p>
                  <p><strong>Payment Method:</strong> {selectedReview.transaction.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {selectedReview.transaction.paymentStatus}</p>
                  <p><strong>Total:</strong> {selectedReview.transaction.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
